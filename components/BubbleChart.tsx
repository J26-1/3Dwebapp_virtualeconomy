import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { EconomyNode } from '../types';

interface BubbleChartProps {
  data: EconomyNode[];
}

// 1. Extend your custom type with D3's internal simulation properties
// This solves the "Property 'x' does not exist" error
type SimulationNode = EconomyNode & d3.SimulationNodeDatum;

const BubbleChart: React.FC<BubbleChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const width = 800;
    const height = 500;
    
    // 2. Type the selection for better autocomplete
    const svg = d3.select<SVGSVGElement, unknown>(svgRef.current);
    svg.selectAll("*").remove();

    // 3. Cast data to SimulationNode[] to satisfy the force engine
    const nodes: SimulationNode[] = data.map(d => ({ ...d }));

    const simulation = d3.forceSimulation<SimulationNode>(nodes)
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05))
      .force("collide", d3.forceCollide<SimulationNode>((d) => d.value + 5))
      .force("charge", d3.forceManyBody().strength(-20));

    const color = d3.scaleOrdinal<string>()
      .domain(["Platform", "Skin", "Fashion", "Asset"])
      .range(["#00f2ff", "#7000ff", "#ff0080", "#ffcc00"]);

    const nodeSelection = svg.append("g")
      .selectAll<SVGGElement, SimulationNode>("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "cursor-pointer transition-transform hover:scale-110");

    nodeSelection.append("circle")
      .attr("r", (d) => d.value)
      .attr("fill", (d) => color(d.group))
      .attr("fill-opacity", 0.4)
      .attr("stroke", (d) => color(d.group))
      .attr("stroke-width", 2);

    nodeSelection.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .style("font-size", (d) => Math.min(d.value / 2.5, 12) + "px")
      .style("fill", "#fff")
      .style("font-weight", "bold")
      .text((d) => d.label);

    simulation.on("tick", () => {
      // d.x and d.y are now recognized because of SimulationNode
      nodeSelection.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    // 4. Fix the EffectCallback error by wrapping the stop call in braces
    // This ensures the cleanup returns 'void' instead of the simulation object
    return () => {
      simulation.stop();
    };
  }, [data]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-black/20 rounded-2xl p-4 overflow-hidden border border-white/5">
      <svg ref={svgRef} width="100%" height="500" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" />
    </div>
  );
};

export default BubbleChart;