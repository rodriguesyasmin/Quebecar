import React from 'react';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import InputField from '../../InputField/InputField'; // Verifique o caminho correto do seu InputField
import './ProvinceCreate.css';

const ProvinceCreate = ({ pays }) => {
    const { t, i18n } = useTranslation();
    const { data, setData, post, errors } = useForm({
        nom_province: '',
        pays_id: '',
    });

    const getPaysOptions = () => {
        return pays.map((paysItem) => {
            let nomPays = { en: 'Invalid JSON', fr: 'JSON invalide' };
            try {
                nomPays = JSON.parse(paysItem.nom_pays);
            } catch (error) {
                console.error("Erreur lors de l'analyse du nom du pays:", error);
            }

            return (
                <option key={paysItem.id_pays} value={paysItem.id_pays}>
                    {i18n.language === 'en' ? nomPays.en : nomPays.fr}
                </option>
            );
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/provinces", {
            data,
            onSuccess: () => {
                console.log("Province créée avec succès");
            },
            onError: (errors) => {
                console.error("Erreur lors de la création de la province", errors);
            },
        });
    };

    return (
        <>
            <div className="form-container">
                <h1>{t('province.create')}</h1>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label={t('province.name')}
                        name="nom_province"
                        value={data.nom_province}
                        onChange={(e) => setData('nom_province', e.target.value)}
                        error={errors.nom_province}
                    />
                    <div className="form-group">
                        <label>{t('province.country')}</label>
                        <select
                            name="pays_id"
                            value={data.pays_id}
                            onChange={(e) => setData('pays_id', e.target.value)}
                            className="form-control"
                        >
                            <option value="">{t('province.select_country')}</option>
                            {getPaysOptions()}
                        </select>
                        {errors.pays_id && <span className="error-text">{errors.pays_id}</span>}
                    </div>
                    <button className="create-button" type="submit">{t('province.create_button')}</button>
                </form>
            </div>
        </>
    );
};

export default ProvinceCreate;
