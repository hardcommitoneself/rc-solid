import { useI18n } from "@solid-primitives/i18n";
import { Title } from "solid-meta";
import { useUserContext } from "src/store/user";

const Debug = () => {
    const [_, { loadUser, incrementExperience, incrementBalance }] = useUserContext();

    function exp() {
        incrementExperience(1500)
    }

    function balance() {
        incrementBalance(365)
    }

    return (
        <div class="flex space-x-5">
            <button onClick={loadUser}>load</button>
            <button onClick={exp}>xp</button>
            <button onClick={balance}>balance</button>
        </div>
    )
}

const Coinflip = () => {
    const [t] = useI18n();

    return (
        <div class="text-gray-100">
            <Title>{t('global.coinflip', {}, 'Coinflip')}</Title>
            coinflip
            <Debug />
        </div>
    );
};

export default Coinflip;