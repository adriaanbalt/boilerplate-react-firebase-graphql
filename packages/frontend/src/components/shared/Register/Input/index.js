import React from "react";

export default (props) => (
    <div>
        <h4>Product information</h4>
        <form
            onSubmit={(e) => this.handleSubmit(e)}
            encType={"multipart/form-data"}>
            <div>
                <label>Title</label>
                <input
                    type='text'
                    onChange={(e) =>
                        this.handleChange(e, "title")
                }/>
            </div>
            <div>
                <label>Description</label>
                <input
                    type='text'
                    onChange={(e) =>
                        this.handleChange(e, "description")
                }/>
            </div>
            <div>
                <input
                    type='file'
                    required
                    onChange={(e) => this.uploadFile(e)}
                />
            </div>
        </form>
    </div>
);
