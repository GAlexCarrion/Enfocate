import { FiHelpCircle } from "react-icons/fi";
import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext";

interface Props {
    nombre: string;
}

/** Botón flotante que abre la guía paso a paso de la técnica actual */
export const IconoComponent = ({ nombre }: Props) => {
    const { noche, t } = useApp();
    const navigate = useNavigate();

    return (
        <button
            type="button"
            onClick={() => navigate(`/guia/${nombre}`)}
            title={`${t.guia.kicker}: ${nombre}`}
            aria-label={`${t.guia.kicker}: ${nombre}`}
            className={`fixed right-5 bottom-5 z-40 flex h-13 w-13 cursor-pointer items-center justify-center rounded-full shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl ${
                noche
                    ? "glass-dark text-cyan-300 hover:text-cyan-200"
                    : "glass-strong text-teal-700 hover:text-teal-600"
            }`}
        >
            <FiHelpCircle size={26} aria-hidden="true" />
        </button>
    );
};
