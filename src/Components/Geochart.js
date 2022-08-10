
import React, { useRef, useEffect, useState } from "react";
import { select, geoPath, geoMercator, min, max, scaleLinear } from "d3";
import useResizeObserver from "./useResizeObserver";

/**
 * Component that renders a map of Germany.
 */

function GeoChart({ data, property }) {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [selectedCountry, setSelectedCountry] = useState(null);

    // will be called initially and on every data change
    useEffect(() => {
        const svg = select(svgRef.current);

        const minProp = min(data.features, feature => feature.properties[property]);
        const maxProp = max(data.features, feature => feature.properties[property]);
        const colorScale = scaleLinear()
            .domain([minProp, maxProp])
            .range(["#ccc", "brown"]);

        // use resized dimensions
        // but fall back to getBoundingClientRect, if no dimensions yet.
        const { width, height } =
            dimensions || wrapperRef.current.getBoundingClientRect();

        // projects geo-coordinates on a 2D plane
        const projection = geoMercator()
            .fitSize([width, height], selectedCountry || data)// Pan north 40 degrees


        // takes geojson data,
        // transforms that into the d attribute of a path element
        const pathGenerator = geoPath().projection(projection);

        // render each country
        svg
            .selectAll(".country")
            .data(data.features)
            .join("path")
            .on("click", (event, feature) => {
                setSelectedCountry(selectedCountry === feature ? null : feature);
            })
            .attr("class", "country")
            .transition()
            .duration(1000)
            .attr("fill", feature => colorScale(feature.properties[property]))
            .attr("d", feature => pathGenerator(feature));


        svg
            .selectAll(".label")
            .data([selectedCountry])
            .join("text")
            .attr("class", "label")
            .text(
                feature =>
                    feature &&
                    feature.properties.name +
                    ": " +
                    feature.properties[property].toLocaleString()
            )
            .attr("x", 25)
            .attr("y", 50);
    }, [data, dimensions, property, selectedCountry]);

    return (
        <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
            <svg style={{ marginLeft: '2%', height: '450px', width: '800px' }} ref={svgRef}></svg>
        </div>
    );
}

export default GeoChart;

