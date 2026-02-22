import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { useState, useMemo } from "react";
import { useGetAllTeachersQuery } from "../../redux/api/user";
import { debounce } from "../../lib/utils";

const TeacherSelect = () => {
    const [searchValue, setSearchValue] = useState("");
    const [staticSearchValue, setStaticSearchValue] = useState("");

    const { data: teachersData = { user: [], total: 0 }, isLoading } = useGetAllTeachersQuery({
        page: 1,
        limit: 10,
        search: searchValue,
    });

    const items = useMemo(() => {
        if (teachersData.total <= 10) {
            return teachersData.user
                .filter((t) =>
                    `${t.firstName} ${t.lastName}`
                        .toLowerCase()
                        .includes(staticSearchValue.toLowerCase())
                )
                .map((t) => ({ ...t, key: t.id }));
        }

        return teachersData.user.map((t) => ({ ...t, key: t.id }));
    }, [teachersData, staticSearchValue]);

    const onInputChange = (value) => {
        if (teachersData.total > 10) {
            debounce(() => setSearchValue(value), 500);
        } else {
            debounce(() => setStaticSearchValue(value), 200);
        }
    };

    const onSelectionChange = (selected) => {
        console.log("Selected teacher:", selected);
    };

    return (
        <Autocomplete
            allowsCustomValue
            className="max-w-xs"
            label="Search a teacher"
            labelPlacement="outside"
            variant="bordered"
            value={searchValue}
            isLoading={isLoading}
            onInputChange={onInputChange}
            onSelectionChange={onSelectionChange}
            defaultItems={items}
        >
            {(item) => (
                <AutocompleteItem description={item.email} key={item.key}>
                    {item.firstName} {item.lastName}
                </AutocompleteItem>
            )}
        </Autocomplete>
    );
};

export default TeacherSelect;