import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthForm from "@/components/auth/AuthForm";

type AuthViewProps = {
  title: string;
  footerText: string;
  footerLinkHref: string;
  footerLinkLabel: string;
};

export default function AuthView({
  title,
  footerText,
  footerLinkHref,
  footerLinkLabel,
}: AuthViewProps) {
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
