import { useState, useCallback } from 'react';

function useToggle(initial = false): [ boolean, () => void ] {
    const [ toggle, setToggle ] = useState<boolean>(initial);

    const fnToggle = useCallback(
        () => {
            setToggle((status) => !status);
        },
        [],
    )

    return [ toggle, fnToggle ];
}

export default useToggle;
