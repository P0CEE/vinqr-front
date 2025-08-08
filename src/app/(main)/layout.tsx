import { AppSidebar } from "@/components/layout/app-sidebar";
import { SiteHeader } from "@/components/layout/site-header";
import { OnboardingWrapper } from "@/components/layout/onboarding";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function MainLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 64)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
      <OnboardingWrapper />
    </SidebarProvider>
  );
}
