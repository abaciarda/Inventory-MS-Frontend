import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleAlertIcon, HandCoinsIcon, RadioIcon, ShieldUserIcon, StoreIcon } from "lucide-react";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EYS - Giriş",
  description:
    "EYS paneline erişmek için kullanıcı adı ve şifrenizle güvenli giriş yapın.",
};

export default function Page() {
  return (
    <div className="grid grid-cols-12 min-h-svh">
      <div className="col-span-12 lg:col-span-7 main-background hidden lg:flex flex-col justify-center items-start p-8">
        <div className="max-w-5xl w-full mx-auto p-3 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 w-fit rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm text-primary-foreground backdrop-blur-md">
              <StoreIcon className="size-4" />
              KOBİ’ler için akıllı stok takibi
            </div>

            <p className="text-4xl font-bold text-white">
              Envanter Yönetim Sistemi
            </p>

            <p className="text-gray-300 text-lg font-light max-w-[70%]">
              Ürünlerinizi, stok seviyelerinizi ve envanter hareketlerinizi tek bir panelden yönetin.
              Düşük stok uyarıları ve kârlılık analizleriyle işletmenizin karar süreçlerini güçlendirin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[78%]">
            <div className="group rounded-2xl border border-primary/25 bg-primary/10 p-4 backdrop-blur-md shadow-sm shadow-black/10 transition hover:bg-primary/15 hover:border-primary/40">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 border border-primary/30">
                <RadioIcon className="size-5 text-primary-foreground" />
              </div>

              <p className="text-white font-semibold">Gerçek Zamanlı Takip</p>
              <p className="text-gray-300 text-sm mt-1 leading-relaxed">
                Stok giriş ve çıkışlarını anlık olarak izleyin.
              </p>
            </div>

            <div className="group rounded-2xl border border-primary/25 bg-primary/10 p-4 backdrop-blur-md shadow-sm shadow-black/10 transition hover:bg-primary/15 hover:border-primary/40">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 border border-primary/30">
                <CircleAlertIcon className="size-5 text-primary-foreground" />
              </div>

              <p className="text-white font-semibold">Düşük Stok Uyarıları</p>
              <p className="text-gray-300 text-sm mt-1 leading-relaxed">
                Kritik seviyeye düşen ürünleri hızlıca fark edin.
              </p>
            </div>

            <div className="group rounded-2xl border border-primary/25 bg-primary/10 p-4 backdrop-blur-md shadow-sm shadow-black/10 transition hover:bg-primary/15 hover:border-primary/40">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 border border-primary/30">
                <HandCoinsIcon className="size-5 text-primary-foreground" />
              </div>

              <p className="text-white font-semibold">Kârlılık Analizi</p>
              <p className="text-gray-300 text-sm mt-1 leading-relaxed">
                Maliyet ve satış fiyatına göre ürün performansını görün.
              </p>
            </div>

            <div className="group rounded-2xl border border-primary/25 bg-primary/10 p-4 backdrop-blur-md shadow-sm shadow-black/10 transition hover:bg-primary/15 hover:border-primary/40">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 border border-primary/30">
                <ShieldUserIcon className="size-5 text-primary-foreground" />
              </div>

              <p className="text-white font-semibold">Güvenli Erişim</p>
              <p className="text-gray-300 text-sm mt-1 leading-relaxed">
                Rol bazlı yetkilendirme ile sistemi kontrollü kullanın.
              </p>
            </div>
          </div>

        </div>
      </div>
      <div className="col-span-12 lg:col-span-5 flex items-center justify-center bg-background p-8">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
              <ShieldUserIcon className="size-7 text-primary" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              Hoş geldiniz
            </h1>

            <p className="mt-2 text-muted-foreground">
              Envanter paneline erişmek için giriş bilgilerinizi giriniz.
            </p>
          </div>

          <form className="flex flex-col gap-5">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Kullanıcı Adı</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="Kullanıcı Adı..."
                  autoComplete="username"
                  className="h-11 bg-muted/40"
                />
              </Field>

              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Şifre</FieldLabel>
                </div>

                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="h-11 bg-muted/40"
                />
              </Field>
            </FieldGroup>

            <Button type="submit" className="h-11 w-full hover:brightness-125">
              Giriş Yap
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}