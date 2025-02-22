import { zodResolver } from "@hookform/resolvers/zod"
import { UseMutateFunction } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import z, { ZodSchema } from "zod"

// Create a generic hook that accepts a dynamic schema typetext-[#9D9D9D]
const useZodForm = (
    schema: ZodSchema,
    mutation: UseMutateFunction,
    defaultValues?: any,
) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        reset,
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            ...defaultValues,
        },
    })

    const onFormSubmit = handleSubmit(async (values) => mutation({ ...values }))

    return {
        register,
        errors,
        onFormSubmit,
        watch,
        reset,
    }
}

export default useZodForm
