import { EmailTemplateProps } from "../../../components/email-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  // const { username, email, context, subject, file } = await request.json();

  const formData = await request.formData();

  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const context = formData.get("content") as string;
  const file = formData.get("file") as File;

  //ファイルを送信する場合は、arrayBuffer()を使ってバイナリデータに変換する
  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["directory0602@gmail.com"],
      subject: subject,
      react: EmailTemplateProps({
        username: username,
        email: email,
        context: context,
      }) as React.ReactElement,
      attachments: [{ filename: file.name, content: buffer }],
    });
    if (error) {
      return NextResponse.json({ error });
    }
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
