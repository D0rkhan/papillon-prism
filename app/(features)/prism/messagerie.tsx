import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Linking, Pressable, TextInput, useWindowDimensions, View } from "react-native";
import { createMMKV } from "react-native-mmkv";

import { getPronoteClient } from "@/hooks/usePronoteExtra";
import { fetchPronoteChatMessages, fetchPronoteChats, sendPronoteMessageInChat } from "@/services/pronote/chat";
import { subscribeManagerUpdate } from "@/services/shared";
import type { Chat, Message } from "@/services/shared/chat";
import { useAlert } from "@/ui/components/AlertProvider";
import {
  accent,
  ActionButton,
  Card,
  EmptyState,
  GlassSurface,
  GText,
  Icon,
  PrismScreen,
  radius,
  Row,
  SkeletonCards,
  space,
  StatusNote,
  useGlass,
  webOnly,
  withAlpha,
} from "@/ui/glass";
import { formatHTML } from "@/utils/format/html";

const store = createMMKV({ id: "pronote-chats-cache" });
const when = (d: Date | string) => {
  const date = new Date(d);
  const today = new Date().toDateString() === date.toDateString();
  return today
    ? date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    : date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
};

export default function MessagerieScreen() {
  const g = useGlass();
  const alert = useAlert();
  const { width } = useWindowDimensions();
  const split = width >= 960;

  const [chats, setChats] = useState<Chat[]>(() => {
    try { return JSON.parse(store.getString("chats") ?? "[]"); } catch { return []; }
  });
  const [live, setLive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [loadingThread, setLoadingThread] = useState(false);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);

  const loadChats = useCallback(async () => {
    const client = getPronoteClient();
    if (!client) { return; }
    setLoading(true);
    try {
      const result = await client.run(session => fetchPronoteChats(session, client.accountId));
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setChats(result);
      setLive(true);
      setFailed(false);
      // The live objects carry PRONOTE handles; the offline copy keeps only the text.
      store.set("chats", JSON.stringify(result.map(({ ref: _ref, ...rest }) => rest)));
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let revision = -1;
    return subscribeManagerUpdate(manager => {
      if (!manager || manager.revision === revision) { return; }
      revision = manager.revision;
      loadChats();
    });
  }, [loadChats]);

  const openChat = useCallback(async (chat: Chat) => {
    setOpen(chat);
    setMessages(null);
    setDraft("");
    const client = getPronoteClient();
    if (!client || !chat.ref) { return; }
    setLoadingThread(true);
    try {
      const list = await client.run(session => fetchPronoteChatMessages(session, client.accountId, chat));
      setMessages([...list].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    } catch (e) {
      alert.showAlert({ title: "Conversation indisponible", description: "PRONOTE n'a pas renvoyé les messages.", icon: "AlertTriangle", color: "#D60046", technical: String(e) });
    } finally {
      setLoadingThread(false);
    }
  }, [alert]);

  const send = useCallback(async () => {
    const client = getPronoteClient();
    const text = draft.trim();
    if (!client || !open?.ref || !text) { return; }
    setSending(true);
    try {
      await client.run(session => sendPronoteMessageInChat(session, open, text));
      setDraft("");
      await openChat(open);
    } catch (e) {
      alert.showAlert({ title: "Message non envoyé", description: "Réessaie dans un instant.", icon: "AlertTriangle", color: "#D60046", technical: String(e) });
    } finally {
      setSending(false);
    }
  }, [alert, draft, open, openChat]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? chats.filter(c => `${c.subject} ${c.creator ?? ""} ${c.recipient ?? ""}`.toLowerCase().includes(q)) : chats;
  }, [chats, query]);

  const listPane = (
    <View style={{ gap: space.md }}>
      <GlassSurface radius={radius.pill}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Rechercher une conversation"
          placeholderTextColor={g.textTertiary}
          style={[{ height: 38, paddingHorizontal: space.lg, color: g.text, fontFamily: "fixeltext-regular", fontSize: 14 }, webOnly({ outlineStyle: "none" })]}
        />
      </GlassSurface>
      {chats.length === 0 && loading ? <SkeletonCards count={3} lines={1} /> : filtered.length === 0 ? (
        <EmptyState icon="Mail" title="Aucune conversation" message={live ? "Ta messagerie PRONOTE est vide." : "Connecte-toi à PRONOTE pour afficher tes messages."} />
      ) : (
        <Card padding={space.md}>
          {filtered.map((c, i) => {
            const active = open?.id === c.id;
            return (
              <View key={c.id} style={{ borderRadius: radius.sm, backgroundColor: active ? withAlpha(accent, 0.12) : "transparent" }}>
                <Row
                  first={i === 0}
                  onPress={() => openChat(c)}
                  leading={<View style={{ width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center", backgroundColor: g.glassFillStrong }}><Icon name="Mail" size={15} /></View>}
                  title={c.subject || "(sans objet)"}
                  subtitle={[c.creator || c.recipient, when(c.date)].filter(Boolean).join(" · ")}
                />
              </View>
            );
          })}
        </Card>
      )}
    </View>
  );

  const threadPane = open ? (
    <Card style={{ gap: space.md }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: space.md }}>
        {!split && <ActionButton icon="ArrowLeft" label="Retour aux conversations" onPress={() => setOpen(null)} />}
        <View style={{ flex: 1, minWidth: 0 }}>
          <GText variant="title3" numberOfLines={2}>{open.subject || "(sans objet)"}</GText>
          <GText variant="caption" tone="tertiary">{open.creator || open.recipient}</GText>
        </View>
      </View>
      {!open.ref ? (
        <StatusNote tone="warning" text="Copie hors ligne : connecte-toi à PRONOTE pour lire cette conversation." />
      ) : loadingThread || !messages ? (
        <SkeletonCards count={2} lines={2} />
      ) : (
        <View style={{ gap: space.md }}>
          {messages.map(m => (
            <View key={m.id} style={{ gap: 4, padding: space.md, borderRadius: radius.md, backgroundColor: g.glassFill, borderWidth: 1, borderColor: g.glassBorder }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", gap: space.md }}>
                <GText variant="caption" tone="secondary" numberOfLines={1} style={{ flex: 1 }}>{m.author}</GText>
                <GText variant="caption" tone="tertiary">{new Date(m.date).toLocaleString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</GText>
              </View>
              <GText variant="body" selectable>{formatHTML(m.content)}</GText>
              {m.attachments.map((f, k) => (
                <Pressable key={k} onPress={() => Linking.openURL(f.url)} style={[{ flexDirection: "row", alignItems: "center", gap: 6 }, webOnly({ cursor: "pointer" })]}>
                  <Icon name="Link" size={14} color={g.tint} />
                  <GText variant="caption" color={g.tint}>{f.name}</GText>
                </Pressable>
              ))}
            </View>
          ))}
          <View style={{ flexDirection: "row", gap: space.sm, alignItems: "flex-end" }}>
            <GlassSurface radius={radius.md} style={{ flex: 1 }}>
              <TextInput
                value={draft}
                onChangeText={setDraft}
                multiline
                placeholder="Répondre…"
                placeholderTextColor={g.textTertiary}
                style={[{ minHeight: 44, maxHeight: 160, padding: space.md, color: g.text, fontFamily: "fixeltext-regular", fontSize: 14 }, webOnly({ outlineStyle: "none" })]}
              />
            </GlassSurface>
            <ActionButton icon="ArrowUp" label="Envoyer" onPress={send} busy={sending} tint={draft.trim() ? accent : undefined} />
          </View>
        </View>
      )}
    </Card>
  ) : (
    <EmptyState icon="TextBubble" title="Choisis une conversation" message="Les messages s'affichent ici." />
  );

  return (
    <PrismScreen back title="Messagerie" overline="Pronote" onRefresh={loadChats} refreshing={loading}>
      {failed && <StatusNote tone="warning" text="Impossible d'actualiser la messagerie pour l'instant." />}
      {!live && chats.length > 0 && <StatusNote text="Copie hors ligne des conversations." />}
      {split ? (
        <View style={{ flexDirection: "row", gap: space.lg, alignItems: "flex-start" }}>
          <View style={{ width: 380 }}>{listPane}</View>
          <View style={{ flex: 1, minWidth: 0 }}>{threadPane}</View>
        </View>
      ) : open ? threadPane : listPane}
    </PrismScreen>
  );
}
