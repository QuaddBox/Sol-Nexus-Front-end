/** @format */
import { z } from "zod";

const signupschema = z.object({
	username: z
		.string()
		.min(3, { message: "username should be at least 3 characters" })
		.max(25, { message: "username should not be more than 25 characters" }),

	email: z.string().email({ message: "Invalid email" }),
});


export { signupschema };
