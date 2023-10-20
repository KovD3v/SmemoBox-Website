import Reminder from "@/components/reminder";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AddReminder from "@/components/addReminder";

export default async function BoxPage({ params: { box } }) {
	const supabase = createServerComponentClient({ cookies });
	const { data: boxData } = await supabase
		.from("boxes")
		.select("*")
		.eq("id", box)
		.single();

	if (!boxData) {
		return <div>Box not found</div>;
	}

	return (
		<div className="flex flex-col p-3 gap-4">
			<div className="">
				<div className="font-bold text-xl">{boxData.name}</div>
				<div>
					<b>Volume: </b>
					{boxData.volume}%
				</div>
				<div>
					<b>Freq: </b>
					{boxData.freq} Hz
				</div>
			</div>
			<div>
				<div className="font-bold text-xl">Reminders </div>
				<div className="grid grid-cols-6">
					{boxData.reminders.map((reminder, index) => (
						<Reminder reminder={reminder} boxData={boxData} key={index} />
					))}
					<AddReminder boxData={boxData} />
				</div>
			</div>
		</div>
	);
}
