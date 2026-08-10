// ============================================================
// EJC Califórnia — Edge Function: admin-set-password
// Permite que o admin dono (e-mail em SUPER_ADMINS) defina a senha de
// outra pessoa diretamente (o navegador não pode fazer isso por segurança).
// Exclusivo do dono — nenhum outro dirigente tem acesso, mesmo sendo
// "Coordenação Geral".
//
// COMO ATIVAR (uma vez):
//   1) Supabase Dashboard > Edge Functions > Deploy a new function
//      Nome: admin-set-password
//      Cole este arquivo inteiro e clique em Deploy.
//   (ou via CLI:  supabase functions deploy admin-set-password --no-verify-jwt)
//
// Não precisa configurar segredos: SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY
// já ficam disponíveis automaticamente dentro da função.
// ============================================================
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// mesma lista do app/index.html (SUPER_ADMINS) — mantenha os dois em sincronia
const SUPER_ADMINS = ["cadastro.ejccalifornia@gmail.com"];

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(url, serviceKey);

    // 1) quem está chamando?
    const token = (req.headers.get("Authorization") || "").replace("Bearer ", "");
    const { data: uData, error: uErr } = await admin.auth.getUser(token);
    if (uErr || !uData?.user) return json({ error: "Não autenticado." }, 401);
    const caller = uData.user;

    // 2) o chamador precisa ser o admin dono (por e-mail)
    const isOwner = SUPER_ADMINS.includes((caller.email || "").trim().toLowerCase());
    if (!isOwner) return json({ error: "Acesso restrito ao administrador." }, 403);

    // 3) valida entrada
    const { email, password } = await req.json();
    const emailL = (email || "").trim().toLowerCase();
    if (!emailL || !password || String(password).length < 6)
      return json({ error: "Informe e-mail e uma senha de ao menos 6 caracteres." }, 400);

    // 4) acha o usuário alvo pelo e-mail
    let target: any = null;
    for (let page = 1; page <= 20 && !target; page++) {
      const { data: list } = await admin.auth.admin.listUsers({ page, perPage: 200 });
      const users = list?.users || [];
      target = users.find((u: any) => (u.email || "").toLowerCase() === emailL) || null;
      if (users.length < 200) break;
    }
    if (!target)
      return json({ error: "Nenhuma conta com esse e-mail. A pessoa precisa ter criado a conta primeiro." }, 404);

    // 5) troca a senha
    const { error: upErr } = await admin.auth.admin.updateUserById(target.id, { password: String(password) });
    if (upErr) return json({ error: upErr.message }, 400);

    return json({ ok: true });
  } catch (e) {
    return json({ error: String((e as any)?.message || e) }, 500);
  }
});
