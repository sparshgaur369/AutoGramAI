import {
    createAutomations,
    deleteKeyword,
    saveKeyword,
    saveListener,
    savePosts,
    saveTrigger,
    updateAutomationName,
} from "@/actions/automations"
import { TRIGGER } from "@/redux/slices/automation"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { z } from "zod"
import { useMutationData } from "./use-mutation-data"
import useZodForm from "./use-zod-form"

export const useCreateAutomation = () => {
    const { mutate, isPending } = useMutationData(
        ["create-automation"],
        () => createAutomations(),
        "user-automations",
    )

    return { isPending, mutate }
}

export const useEditAutomation = (automationId: string) => {
    const [edit, setEdit] = useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement | null>(null)

    const enableEdit = () => setEdit(true)
    const disableEdit = () => setEdit(false)

    const { isPending, mutate } = useMutationData(
        ["update-automation"],
        (data: { name: string }) =>
            updateAutomationName(automationId, { name: data.name }),
        "automation-info",
        disableEdit,
    )

    useEffect(() => {
        function handleClickOutside(this: Document, event: MouseEvent) {
            // Check if the click was outside the element
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target as Node | null)
            ) {
                if (inputRef.current.value !== "") {
                    mutate({ name: inputRef.current.value })
                } else {
                    disableEdit()
                }
            }
        }

        // Attach the event listener to the document
        document.addEventListener("mousedown", handleClickOutside)

        // Clean up the event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return {
        edit,
        enableEdit,
        disableEdit,
        inputRef,
        isPending,
    }
}

export const useTriggers = (id: string) => {
    const types = useAppSelector(
        (state) => state.AutmationReducer.trigger?.types,
    )

    const dispatch: AppDispatch = useDispatch()

    const onSetTrigger = (type: "COMMENT" | "DM") =>
        dispatch(TRIGGER({ trigger: { type } }))

    const { mutate, isPending } = useMutationData(
        ["add-trigger"],
        (data: { types: string[] }) => saveTrigger(id, data.types),
        "automation-info",
    )

    const onSaveTrigger = () => mutate({ types })

    return { types, onSetTrigger, onSaveTrigger, isPending }
}

export const useKeywords = (id: string) => {
    const [keyword, setKeyword] = useState<string>("")

    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setKeyword(e.target.value)

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            mutate({ keyword: keyword })
            setKeyword("")
        }
    }

    const { mutate } = useMutationData(
        ["add-keyword"],
        (data: { keyword: string }) => saveKeyword(id, data.keyword),
        "automation-info",
        () => setKeyword(""),
    )

    const { mutate: deleteMutation } = useMutationData(
        ["delete-keyword"],
        (data: { id: string }) => deleteKeyword(data.id),
        "automation-info",
    )

    return { keyword, onValueChange, onKeyPress, deleteMutation }
}

export const useListener = (id: string) => {
    const [listener, setListener] = useState<"MESSAGE" | "SMARTAI">("MESSAGE")

    const promptSchema = z.object({
        prompt: z.string().min(1),
        reply: z.string(),
    })

    const { mutate, isPending } = useMutationData(
        ["create-listener"],
        (data: { prompt: string; reply: string }) =>
            saveListener(id, listener, data.prompt, data.reply),
        "automation-info",
    )

    const { register, onFormSubmit } = useZodForm(promptSchema, mutate)

    const onSetListener = (type: "SMARTAI" | "MESSAGE") => setListener(type)

    return { onSetListener, register, onFormSubmit, listener, isPending }
}

export const useAutomationPosts = (id: string) => {
    const [posts, setPosts] = useState<
        {
            postid: string
            caption?: string
            media: string
            mediaType: "IMAGE" | "VIDEO" | "CAROSEL_ALBUM"
        }[]
    >([])

    const onSelectPost = (post: {
        postid: string
        caption?: string
        media: string
        mediaType: "IMAGE" | "VIDEO" | "CAROSEL_ALBUM"
    }) => {
        setPosts((prevItems) => {
            if (prevItems.find((p) => p.postid === post.postid)) {
                // Remove the duplicate by filtering it out
                return prevItems.filter((item) => item.postid !== post.postid)
            } else {
                // Add the new item to the array
                return [...prevItems, post]
            }
        })
    }

    const { mutate, isPending } = useMutationData(
        ["attach-posts"],
        () => savePosts(id, posts),
        "automation-info",
        () => setPosts([]),
    )

    return { posts, onSelectPost, mutate, isPending }
}
