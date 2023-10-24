import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function HorizontalBarChart({ data, xLabel, height, delay = 0, gradual = false }) {
  const svgRef = useRef();
  const dataWithLabels = d3.zip(data, xLabel);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = svgRef.current.parentElement.clientWidth;

    // Find the maximum value and its index
    const maxDataValue = Math.max(...data);
    const maxIndex = data.indexOf(maxDataValue);
    const minDataValue = Math.min(...data);
    const minIndex = data.indexOf(minDataValue);

    // Define height and scale
    const barHeight = height / data.length;
    const scale = (width - 30) / maxDataValue;

    // Create the bar chart with width proportional to d[0]
    svg.selectAll("rect")
      .data(dataWithLabels)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", (d, i) => i * barHeight)
      .attr("width", 0)
      .attr("height", barHeight)
      .attr("class", (d, i) => (i === maxIndex
                                  ? "bar maximum"
                                  : i === minIndex
                                    ? "bar minimum"
                                    : i % 2 === 0 
                                      ? "bar even"
                                      : "bar odd"))
      .transition()
      .delay(gradual ? (d, i) => delay * 1000 + i*40 : delay * 1000)
      .duration(1000)
      .attr("width", (d) => d[0] * scale);

    // Create the bar top label containing the values in d[0]
    svg.selectAll(".bar-text-top")
      .data(dataWithLabels)
      .enter()
      .append("text")
      .text((d) => d[0])
      .attr("x", (d) => d[0] * scale + 5)
      .attr("y", (_, i) => (i + 1/2) * barHeight)
      .attr("text-anchor", "start")
      .attr("dominant-baseline", "central")
      .attr("class", 
        (_, i) => (i === maxIndex
                    ? "bar-text-top maximum"
                    : i === minIndex
                      ? "bar-text-top minimum"
                      : i % 2 === 0 
                        ? "bar-text-top even"
                        : "bar-text-top odd"))
      .style("opacity", 0)
      .transition()
      .delay(gradual ? (_, i) => delay * 1000 + 1000 + i*30 : delay * 1000 + 1000)
      .duration(200)
      .style("opacity", 1);

    // Create the bar bottom label containing the labels in d[1]
    svg.selectAll(".bar-text-bottom")
      .data(dataWithLabels)
      .enter()
      .append("text")
      .text((d) => d[1])
      .attr("x", 10)
      .attr("y", (_, i) => (i + 1/2) * barHeight)
      .attr("text-anchor", "start")
      .attr("dominant-baseline", "central")
      .attr("class", "bar-text-bottom")
      .style("opacity", 0)
      .transition()
      .delay(gradual ? (_, i) => delay * 1000 + 1000 + i*30 : delay * 1000 + 1000)
      .duration(200)
      .style("opacity", 1);
  }, [data]);

  return (
    <div className="chart-container" width="100%">
      <svg
        ref={svgRef}
        width="100%"
        height={height}
        overflow={"visible"}
      />
    </div>
  );
}

export default HorizontalBarChart;
