import { Assignment } from "skolengojs";

import { Attachment } from "@/services/shared/attachment";
import { GenericInterface } from "@/services/shared/types";

/**
 *  This interface defines the general structure of a homework object.
 *  @property {string} id - Unique Identifier for each item.
 *  @property {string} subject - The subject of the homework.
 *  @property {string} content - The content or description of the homework in HTML.
 *  @property {Date} dueDate - The date when the homework is due.
 *  @property {boolean} isDone - Indicates whether the homework has been completed.
 *  @property {ReturnFormat} returnFormat - The format in which the homework should be returned.
 *  @property {Array<Attachment>} attachments - List of attachments related to the homework.
 *  @property {boolean} evaluation - Indicates whether the homework is subject to evaluation.
 *  @property {boolean} custom - Indicates whether the homework is custom or predefined.
 *  @property {string} createdByAccount - The local account ID of the user who created the homework, useful for the manager.
 */
export interface Homework extends GenericInterface{
  id: string;
  subject: string;
  content: string;
  dueDate: Date;
  isDone: boolean;
  returnFormat?: ReturnFormat;
  attachments: Attachment[];
  evaluation: boolean;
  custom: boolean;
  progress?: number;
	ref?: Assignment;
  /** PRONOTE: 1 easy · 2 medium · 3 hard (0/undefined: not set). */
  difficulty?: number;
  /** PRONOTE: expected working time, in minutes. */
  length?: number;
  themes?: string[];
  /** PRONOTE: the student can hand it in online. */
  canUpload?: boolean;
  /** PRONOTE: name of the file already handed in. */
  uploadedFile?: string;
}

export enum ReturnFormat {
  PAPER,
  FILE_UPLOAD
}