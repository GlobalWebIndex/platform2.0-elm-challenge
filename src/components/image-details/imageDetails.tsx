import { getCatDetails } from "@/lib/data";
import Image from "next/image";
import type { BREED, IMAGE_DETAILS_PROPS } from "@/lib/types";
import styles from "./imageDetails.module.scss";

export default async function ImageDetails({ id }: IMAGE_DETAILS_PROPS) {
  const catDetails = await getCatDetails(id);

  let { url, breeds, width, height, error } = catDetails;
  let breedDetails: BREED | null = null;
  let name = "";

  if (breeds) {
    breedDetails = breeds[0];
    name = breedDetails.name;
  }

  return error ? (
    <div>{error}</div>
  ) : (
    <div className={styles.imageContainer}>
      <div className={styles.imageDetails}>
        <section className={styles.imageSection}>
          <figure className={styles.figure}>
            <Image
              src={url}
              alt={name}
              className={styles.image}
              width={width}
              height={height}
            />
            {breedDetails && <figcaption>{breedDetails.name}</figcaption>}
          </figure>
        </section>
        <section className={styles.detailsSection}>
          {/* TODO: Add more details in the form of charts */}
          {breedDetails ? (
            <table className={styles.detailsTable}>
              <tbody>
                <tr>
                  <td>Breed:</td>
                  <td>{breedDetails.name}</td>
                </tr>
                <tr>
                  <td>Weight:</td>
                  <td>{breedDetails.weight.metric} Kgs</td>
                </tr>
                <tr>
                  <td>Life Span:</td>
                  <td>{breedDetails.life_span} years</td>
                </tr>
                <tr>
                  <td>Origin: </td>
                  <td>{breedDetails.origin} years</td>
                </tr>
                <tr>
                  <td>Temperament:</td>
                  <td>{breedDetails.temperament}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div>No known breeds</div>
          )}
        </section>
      </div>
      {breedDetails && (
        <div className={styles.description}>{breedDetails.description}</div>
      )}
    </div>
  );
}
