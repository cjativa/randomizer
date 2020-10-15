import React, { ReactHTML, useState } from 'react';
import SponsorForm from './sponsor';

const ChildInformation = (props: any) => {

    const { child, setShowChildModal } = props
    const genderEmoji = (child.gender == 'Male') ? '👦' : '👧';

    const [willSponsor, setWillSponsor] = useState<boolean | null>(null);

    /** Handles when the user decides not to sponsor the child in question */
    const handleWillNotSponsor = () => {
        setWillSponsor(false);
        setShowChildModal(false);
    };

    return (
        <div className="child">
            <h1>You picked {child.name} {genderEmoji}</h1>
            <h2>Here's some information about them</h2>

            {/** Child information */}
            <p><span className="child__label">Name</span>: {child.name}</p>
            <p><span className="child__label">Age</span>: {child.age}</p>
            <p><span className="child__label">Gender</span>: {child.gender}</p>
            <p><span className="child__label">Residence</span>: {child.residence}</p>

            <div className="child__switch">
                {/** Display the select buttons only when no option has yet been chosen */}
                {willSponsor == null &&
                    <div className="child__select">
                        <p>You can sponsor this child or choose again.</p>

                        <div className="child__buttons">
                            <button onClick={() => setWillSponsor(true)}>
                                Yes, I'll sponsor this child
                        </button>
                            <button onClick={handleWillNotSponsor}>
                                I'll pick again
                        </button>
                        </div>
                    </div>
                }

                {/** Display the sponsorship form if they choose to sponsor this child */}
                {willSponsor == true &&
                    <SponsorForm
                        setShowChildModal={setShowChildModal}
                    />
                }
            </div>


        </div>
    );
};



export default ChildInformation;