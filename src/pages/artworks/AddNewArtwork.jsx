import styles from './AddNewArtwork.module.css'
import {useForm} from "react-hook-form";

export default function AddNewArtwork() {

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className={styles.pageContainer}>
            <h1>Add new Artwork</h1>
            <form className={styles.addArtworkForm} onSubmit={handleSubmit(onSubmit)}>

                    <div className={styles.addImageContainer}>
                        <label>Upload image :</label>
                        <input
                            type="file"
                            {...register("image", {required: true})}
                        />
                        {errors.image && <p>This field is required</p>}
                        <div className={styles.addFieldsContainer}>
                            <label>Title :</label>
                            <input
                                type="text"
                                {...register("title", {required: true})}
                                placeholder={"Enter title"}
                            />
                            {errors.title && <p>This field is required</p>}
                            <label>Type of Artwork :</label>
                            <select
                                {...register("artworkType", {required: true})}>
                                <option value="">Select type</option>
                                <option value="painting">Painting</option>
                                <option value="drawing">Drawing</option>
                            </select>
                            {errors.artworkType && <p>This field is required</p>}
                            <label>Dimensions in CM :</label>
                            <input
                                type="number"
                                name={"widthInCm"}
                                {...register("dimensions", {required: true})}
                            />
                            <input
                                type="number"
                                name={"heightInCm"}
                                {...register("dimensions", {required: true})}
                            />
                            {errors.dimensions && <p>This field is required</p>}
                            <label>Edition :</label>
                            <select
                                {...register("edition", {required: true})}>
                                <option value="">Select edition</option>
                                <option value="unique">Painting</option>
                                <option value="limited">Limited</option>
                                <option value="reproduction">Reproduction</option>
                            </select>
                            {errors.edition && <p>This field is required</p>}
                            <label>Gallery buying price :</label>
                            <input
                                type="number"
                                {...register("price", {required: true})}
                                placeholder={"Enter price"}
                            />
                            {errors.price && <p>This field is required</p>}
                            <label>Description :</label>
                            <textarea
                                {...register("description", {required: true})}
                                placeholder={"Enter description"}
                            />
                            {errors.description && <p>This field is required</p>}

                            <button type="submit">Submit</button>
                        </div>
                </div>
            </form>
        </div>
    )
}
