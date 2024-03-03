import { z } from "zod";

const MAX_MB = 5;
const MAX_FILE_SIZE = MAX_MB * 1024 * 1024;
const ACCEPTED_FILE_TYPE = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

export const formSchema = z.object({
  username: z.string().min(2, { message: "ユーザー名は2文字以上で入力してください" }),
  subject: z.string().min(2, { message: "主題名は2文字以上で入力してください" }),
  email: z.string().email({ message: "適切なメールアドレスを入力してください" }),
  content: z
    .string()
    .min(2, { message: "本文は2文字以上で入力してください" })
    .max(160, { message: "本文は160文字以上で入力してください" }),
  file: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, "ファイルを添付してください")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `ファイルサイズは${MAX_MB}MB以下にしてください`)
    .refine(
      (files) => ACCEPTED_FILE_TYPE.includes(files?.[0]?.type),
      "ファイル形式はpng, jpeg, jpg, webpのいずれかにしてください"
    ),
});
