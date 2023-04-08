
import React from "react";

import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/Carousel/Carousel";

const Recommended = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );

    return (
        <Carousel
            title="Recommended"
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    );
};

export default Recommended;