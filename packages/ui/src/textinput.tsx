"use client"

export const TextInput = ({
    placeholder,
    onChange,
    label
}: {
    placeholder: string;
    onChange: (value: string) => void;
    label: string;
}) => {
    return <div className="pt-2">
        <label className="block mb-2 text-sm font-medium text-white">{label}</label>
        <input onChange={(e) => onChange(e.target.value)} type="text" id="first_name" className="bg-gray-800 text-white text-sm rounded-lg block w-full p-2.5" placeholder={placeholder} />
    </div>
}