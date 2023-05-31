import React, { useState } from 'react';
import styles from './PopupForm.module.scss';
import classNames from 'classnames';
import { postPlace } from '../../api/places';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  latitude?: string;
  longitude?: string;
  reloadPlaces: () => Promise<void>;
}

export const PopupForm = (props: Props) => {
  const {
    latitude = '',
    longitude = '',
    className,
    reloadPlaces,
    ...restProps
  } = props;
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    latitude,
    longitude,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormData({
      name: '',
      description: '',
      latitude: '',
      longitude: '',
    });

    await postPlace(formData);
    await reloadPlaces();
  };

  return (
    <div className={classNames(styles['popup-form'], className)} {...restProps}>
      <h2>Add new Place</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          placeholder="Please enter name"
          className={styles.input}
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="description">Description:</label>
        <input
          placeholder="Please enter description"
          className={styles.input}
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label htmlFor="latitude">Latitude:</label>
        <input
          placeholder="Please enter latitude"
          className={styles.input}
          type="text"
          id="latitude"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
        />

        <label htmlFor="longitude">Longitude:</label>
        <input
          placeholder="Please enter longitude"
          className={styles.input}
          type="text"
          id="longitude"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
        />

        <button className={styles.submit} type="submit">
          Add
        </button>
      </form>
    </div>
  );
};