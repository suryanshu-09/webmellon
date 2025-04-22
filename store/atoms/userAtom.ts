import { atom } from 'jotai';
import { type Session } from "next-auth"

export const userAtom = atom<Session["user"] | null>(null)
