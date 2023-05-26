import './addTodo.css'

export const AddTodo = ({ todoValue, handleChange, handleSubmit, isEdit, errorMsg }) => {
    return (
        <>
            <div className='input-container'>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={todoValue} placeholder="Text  here..." onChange={handleChange} />

                    <button disabled={errorMsg} type="submit">Save</button>
                    {isEdit ? <button>Cancel</button> : ""}
                </form>
                {errorMsg && <span style={{ textAlign: "left", color: "red" }}>Field is empty</span>}
            </div>

        </>
    )
}

