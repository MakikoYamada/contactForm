import { formSchema } from "../lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useMailForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      subject: "",
      email: "",
      content: "",
      file: undefined,
    },
  });

  const onSubmit = useCallback(async (value: z.infer<typeof formSchema>) => {
    const { username, email, content, subject, file } = value;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("content", content);
    formData.append("subject", subject);
    formData.append("file", file[0]);

    console.log(username, email, content, subject, file);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send`, {
        method: "POST",
        body: formData,
        // ファイルを送信する場合は、Content-Typeヘッダーを設定しない
        // headers: {
        //   "Content-Type": "application/json",
        // },
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { form, onSubmit };
};
