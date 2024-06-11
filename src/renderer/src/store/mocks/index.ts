import { NoteInfo } from "@shared/models";

export const notesMock: NoteInfo[] = [
  {
    id: 0,
    title: "Welcome 👋",
    content: "Content 0",
    categories: ["Category 0"],
    shared_with: ["User 1", "User 2", "User 3"],
    created_at: 1623700000000,
    updated_at: 1623700000000,
  },
  {
    id: 1,
    title: "Note 1",
    content: "Content 1",
    categories: ["Category 1"],
    shared_with: ["User 1"],
    created_at: 1623700000000,
    updated_at: 1623700000000,
  },
  {
    id: 2,
    title: "Note 2",
    content: "Content 2",
    categories: ["Category 2"],
    shared_with: ["User 2"],
    created_at: 1623700000000,
    updated_at: 1623700000000,
  },
  {
    id: 3,
    title: "Note 3",
    content: "Content 3",
    categories: ["Category 3"],
    shared_with: ["User 3"],
    created_at: 1623700000000,
    updated_at: 1623700000000,
  },
]
