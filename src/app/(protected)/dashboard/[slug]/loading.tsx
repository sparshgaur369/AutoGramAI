import { Loader } from "@/components/global/loaders"

const Loading = () => {
    return (
        <div className="flex-1 flex justify-center items-center">
            <Loader state>...loading</Loader>
        </div>
    )
}

export default Loading
