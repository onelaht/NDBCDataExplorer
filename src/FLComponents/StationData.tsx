import {useLocation} from "react-router-dom";

export default function StationData() {
    const {pathname} = useLocation();
    return (
        <>
            {pathname}
        </>
    )
}