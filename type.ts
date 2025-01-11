import { Invoice as PrismaInvoice } from '@prisma/client';
import { InvoiceLine } from '@prisma/client';
// import { User as PrismaUser } from '@prisma/client';

export interface Invoice extends PrismaInvoice {
  lines: InvoiceLine[];
}

export interface Totals {
  totalHT: number;
  totalVAT: number;
  totalTTC: number;
}

// export interface User extends PrismaUser {
//   email: string,
//   prenom: string,
//   nom: string,
//   invoices: string,
// }

// export interface Post extends PrismaPost {
//   title: string,
//   content: string,
//   published: boolean,
//   authorId: number,
// }

// export interface Profile extends PrismaProfile {
//   bio: string,
//   sexe: string,
//   adresse: string,
//   userId: number,
//   telephone: string,
//   photo: string,
// }
