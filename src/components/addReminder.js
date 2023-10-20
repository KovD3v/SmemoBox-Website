import { revalidatePath } from "next/cache";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function AddReminder(boxData) {
	const addReminder = async (formData) => {
		"use server";
		const data = boxData.boxData;
		const name = formData.get("name");
		const slot = formData.get("slot");
		const time = formData.get("time");
		const color = formData.get("color").replace("#", "");
		if (0 < slot && slot <= 4 && name != "" && time != "" && color != "") {
			const arrRem = [
				...data.reminders,
				{ name: name, slot: slot, time: time, color: color },
			];
			const supabase = createServerActionClient({ cookies });
			await supabase
				.from("boxes")
				.update({ reminders: arrRem })
				.eq("id", data.id);
		}
        else {
            console.log("Invalid slot");
        }
        revalidatePath(`/boxes/${data.id}`);
	};
	return (
		<form
			className={`flex flex-col shadow-2xl m-3 p-3 rounded-xl bg-gray-400 gap-1`}
			action={addReminder}>
			<input type="text" placeholder="Name" name="name" className="appearance-none" />
			<input type="time" placeholder="Time" name="time" className="appearance-none"/>
            <input type="number" placeholder="Slot" name="slot" className="appearance-none"/>
            <input type="color" placeholder="Color" name="color" className="appearance-none"/>
			<button type="submit">Add Reminder</button>
		</form>
	);
}
