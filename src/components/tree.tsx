import React, { useEffect, useRef } from 'react';

const Tree = () => {

    const treeRef = useRef<SVGPolygonElement>(null);



    useEffect(() => {

        // The vertices of the polygon triangle
        const { 0: topCenter, 1: bottomLeft, 2: bottomRight } = treeRef.current?.points!;

        console.log(topCenter, bottomLeft, bottomRight);

        /** Generates coordinates for a random point inside a triangle */
        const generatePointInsideTriangle = (pt1: DOMPoint, pt2: DOMPoint, pt3: DOMPoint): Number[] => {

            const [s, t] = [Math.random(), Math.random()];

            const x = s * pt1.x + (t - s) * pt2.x + (1 - t) * pt3.x;
            const y = s * pt1.y + (t - s) * pt2.y + (1 - t) * pt3.y;

            return [x, y];
        };

        // List of random points in the triangle
        const randomPoints = [...Array(10)].map((_) => generatePointInsideTriangle(topCenter, bottomLeft, bottomRight));
        console.log(randomPoints);



    }, [treeRef]);

    return (
        <div className="tree" >
            <svg height="400" width="500">
                <polygon
                    ref={treeRef}
                    points="250,20 50,400 450,400"
                    className="tree-top" />
            </svg>
            <div className="tree-trunk" />
            <Ornament />
        </div>
    );
};

const Ornament = () => {
    return (
        <div className="circle" />
    )
};

export default Tree;