import Box from "@/components/box";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Boxes() {
	const supabase = createServerComponentClient({ cookies });
	const { data: boxes } = await supabase
		.from("boxes")
		.select("*")
    
	return (
			<div className="flex">
                {boxes?.map(box => <Box key={box.id} box={box} />)}
			</div>
	);
}
