interface tag{
    title:string
    classname?:string
}
export default function TagWrapper({title,classname=""}:tag) {
    return(
        <p className={`py-1 px-2 text-xs font-semibold rounded-full bg-white/10 ${classname}`}>{title}</p>
    )
}