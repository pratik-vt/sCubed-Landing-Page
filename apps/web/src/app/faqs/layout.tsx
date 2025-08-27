import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQs - S Cubed',
  description: 'Frequently Asked Questions about S Cubed ABA Practice Management Software',
};

export default function FAQsLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <>{children}</>;
}
