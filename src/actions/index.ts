export const prerender = false;

import { ActionError, defineAction } from "astro:actions";
import { z } from 'astro:schema';
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  send: defineAction({
    accept: "form",
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      subject: z.string(),
      message: z.string()
    }),
    handler: async ({ name, email, subject, message }) => {
      const emailHtmlContent = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `;

      const { data, error } = await resend.emails.send({
        from: 'Maik Hasler <hello@maik-hasler.de>',
        to: [import.meta.env.PRIVATE_EMAIL_ADDRESS],
        subject: `New Contact Form Submission: ${subject}`,
        html: emailHtmlContent,
      });

      if (error) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: error.message,
        });
      }

      return data;
    },
  }),
};