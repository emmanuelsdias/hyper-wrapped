import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function BarChart({ data, xLabel, delay = 0, gap = 6, gradual = false, rotate = false }) {
  const svgRef = useRef();
  const dataWithLabels = d3.zip(data, xLabel);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = svgRef.current.parentElement.clientWidth;
    const height = 300;

    // Find the maximum value and its index
    const maxDataValue = Math.max(...data);
    const maxIndex = data.indexOf(maxDataValue);
    const minDataValue = Math.min(...data);
    const minIndex = data.indexOf(minDataValue);

    // Define width, scale and gaps
    const barWidth = width / data.length;
    const scale = (height - 30) / maxDataValue;

    // Create the bar chart with height proportional to d[0]
    svg.selectAll("rect")
      .data(dataWithLabels)
      .enter()
      .append("rect")
      .attr("x", (d, i) => gap / 2 + i * barWidth)
      .attr("y", height)
      .attr("width", barWidth - gap)
      .attr("height", 0)
      .attr("class", (d, i) => (i === maxIndex
                                  ? "bar maximum"
                                  : i === minIndex
                                    ? "bar minimum"
                                    : i % 2 === 0 
                                      ? "bar even"
                                      : "bar odd"))
      .transition()
      .delay(gradual ? (d, i) => delay * 1000 + i*20 : delay * 1000)
      .duration(1000)
      .attr("y", (d) => height - d[0] * scale)
      .attr("height", (d) => d[0] * scale);

    // Create the bar top label containing the values in d[0]
    svg.selectAll(".bar-text-top")
      .data(dataWithLabels)
      .enter()
      .append("text")
      .text((d) => d[0])
      .attr("x", (d, i) => i * barWidth + (rotate ? ( barWidth / 8) : (barWidth / 2)))
      .attr("y", (d) => height - d[0] * scale - 5)
      .attr("transform", rotate ? (d, i) => `rotate(+90, ${i * barWidth + barWidth / 8}, ${height - d[0] * scale - 5})` : '')
      .attr("text-anchor", rotate ? "end" : "middle")
      .attr("class", (d, i) => (i === maxIndex
                                  ? "bar-text-top maximum"
                                  : i === minIndex
                                    ? "bar-text-top minimum"
                                    : i % 2 === 0 
                                      ? "bar-text-top even"
                                      : "bar-text-top odd"))
      .style("opacity", 0)
      .transition()
      .delay(gradual ? (d, i) => delay * 1000 + 1000 + i*20 : delay * 1000 + 1000)
      .duration(200)
      .style("opacity", 1);

    // Create the bar bottom label containing the labels in d[1]
    svg.selectAll(".bar-text-bottom")
      .data(dataWithLabels)
      .enter()
      .append("text")
      .text((d) => d[1])
      .attr("x", (d, i) => i * barWidth + barWidth / 2)
      .attr("y", (d) => height - 10)
      .attr("text-anchor", "middle")
      .attr("class", "bar-text-bottom")
      .style("opacity", 0)
      .transition()
      .delay(delay * 1000 + 1000)
      .duration(200)
      .style("opacity", 1);
  }, [data]);

  return (
    <div className="chart-container" width="100%">
      <svg
        ref={svgRef}
        width="100%"
        height={300}
        overflow={"visible"}
      />
    </div>
  );
}

export default BarChart;
