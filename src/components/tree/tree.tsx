import React, { useEffect, useRef, useState } from 'react';
import chrismasTree from '../../assets/media/tree.png';
import children from './treeInput.json';
import Modal from '../child/modal';
import Child from '../child/child';
import ChildInformation from '../child/child';

const Tree = () => {

    const [selectedChild, setSelectedChild] = useState<any>(null);
    const [showChildModal, setShowChildModal] = useState<boolean>(false);

    /** Handles a click on the tree by displaying the information for a random child */
    const handleTreeClick = (e: any) => {
        const randomChild = children[Math.floor(Math.random() * children.length)];
        setSelectedChild(randomChild);
        setShowChildModal(true);
    };

    /** Handles when modal should be closed */
    const handleModalClose = () => {
        setSelectedChild(null);
        setShowChildModal(false);
    };

    /** Allows for closing the */

    return (
        <div className="tree" >
            {/** Christmas tree display */}
            <img
                src={chrismasTree}
                className="tree__bg"
                onClick={handleTreeClick}
            />

            {/** If a child's been selected, show their information */}
            {selectedChild && <Modal
                shouldBeOpen={showChildModal}
                onRequestClose={handleModalClose}
                component={
                    <ChildInformation
                        child={selectedChild}
                        setShowChildModal={setShowChildModal}
                    />
                }

            />}

        </div>
    );
};

export default Tree;