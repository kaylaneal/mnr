import { useState } from "react";
import { addNewContest } from "../../api-client";

const AddContest = ( {onSuccess}) => {
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async(event) => {
        event.preventDefault();

        const form = event.currentTarget; // the submitted form to add a new contest
        const newContestData = {
            contestName: form.contestName.value,
            categoryName: form.categoryName.value,
            description: form.description.value
        };

        const newContest = await addNewContest(newContestData);
        if (newContest?.id){
            form.reset();
            onSuccess(newContest);
        }
    };


    return (
        <div className="add-new-contest">
            { !showForm && (
            <div className="link" onClick={()=>setShowForm(true)}>Add New Contest</div>)}

            { showForm && (
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Contest Name" name="contestName"></input>
                    <input type="text" placeholder="Contest Category" name="categoryName"></input>
                    <textArea placeholder="Contest Description" name="description" rows={5}></textArea>

                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};

export default AddContest;