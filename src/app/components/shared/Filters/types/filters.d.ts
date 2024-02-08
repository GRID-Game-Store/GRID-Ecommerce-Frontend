export interface IFiltersProps {
    variant: "slider" | "checkbox" | "checkboxWithoutSearch";
}

interface ITitleFilterGroupProps {
    name: string;
}
interface IWrapperFilterGroupProps {
    children: React.ReactNode;
}

interface ICheckboxes {
    id: number;
    name : string;
    value: number;
}


interface ICheckboxFilterGroupProps {
    checkboxes: Array<ICheckboxes>;
}
