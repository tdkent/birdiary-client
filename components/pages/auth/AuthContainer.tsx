import AuthForm from "@/components/forms/AuthForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type AuthProps = {
  title: string;
  footerText: string;
  footerLinkHref: string;
  footerLinkLabel: string;
};

export default function AuthContainer({
  title,
  footerText,
  footerLinkHref,
  footerLinkLabel,
}: AuthProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1>{title}</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AuthForm />
      </CardContent>
      <CardFooter>
        <p className="text-sm">
          {footerText} <Link href={footerLinkHref}>{footerLinkLabel}</Link>
        </p>
      </CardFooter>
    </Card>
  );
}
