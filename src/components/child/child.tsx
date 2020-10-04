import React from 'react';

const ChildInformation = (props: any) => {

    const { child } = props


    const genderEmoji = (child.gender == 'Male') ? '👦' : '👧';

    return (
        <div className="child">
            <h1>You picked {child.name} {genderEmoji}</h1>
            <h2>Here's some information about them</h2>
            <br /><br />

            {/** Child information */}
            <p><span className="child__label">Name</span>: {child.name}</p>
            <p><span className="child__label">Age</span>: {child.age}</p>
            <p><span className="child__label">Gender</span>: {child.gender}</p>
            <p><span className="child__label">Residence</span>: {child.residence}</p>

            <div className="child__select">
                <p>You can sponsor this child or choose again.</p>

                <div className="child__buttons">
                    <button>
                        Yes, I'll sponsor this child
                </button>
                    <button>
                        I'll pick again
                </button>
                </div>
            </div>
        </div>
    );
};

export default ChildInformation;