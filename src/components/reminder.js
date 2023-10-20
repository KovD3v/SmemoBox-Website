import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";


export default async function Reminder({ reminder, boxData }) {
	const deleteReminder = async () => {
		"use server";
		const reminders = boxData.reminders;
		for (let i = 0; i < reminders.length; i++) {
			if (reminders[i].name === reminder.name) {
				reminders.splice(i, 1);
				break;
			}
		}
		const supabase = createServerActionClient({ cookies });
		await supabase.from("boxes").update({ reminders: reminders }).eq("id", boxData.id);
		revalidatePath(`/boxes/${boxData.id}`);
	}

	return (
		<form
			className={`flex flex-col shadow-xl m-3 p-3 rounded-xl gap-1`}
			style={{ backgroundColor: `#${reminder.color}` }}
				action={deleteReminder}>
			<div>
				<b>Name: </b>
				{reminder.name}
			</div>
			<div>
				<b>Time: </b>
				{reminder.time}
			</div>
			<div>
				<b>Slot: </b>
				{reminder.slot}
			</div>
			<div>
				<b>Color: </b>
				{reminder.color}
			</div>
			<button type="submit">Delete</button>
		</form>
	);
}
