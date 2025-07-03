import OpenBankingConnect from "@/components/openBanking/OpenBankingConnect";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

 
  return <div>
    {id && id.length > 0 &&
    <OpenBankingConnect id={id} />
}
  </div>;
}
