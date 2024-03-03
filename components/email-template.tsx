import * as React from "react";

interface EmailTemplateProps {
  username: string;
  email: string;
  context: string;
}

export const EmailTemplateProps: React.FC<Readonly<EmailTemplateProps>> = ({
  username,
  email,
  context,
}) => {
  return (
    <div>
      <h1>こんにちは、{username}です。</h1>
      <p>{email}から届きました。</p>
      <p>{context}</p>
    </div>
  );
};
