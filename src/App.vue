<template>
    <v-app>
        <v-content>
            <vContainer>
                <vRow>
                    <p class="display-3">
                        Bad News #70's zizis
                    </p>
                </vRow>
                <vRow>
                    <p class="title">
                        <span class="grey--text lighten-1">Commentaires:</span> {{ count.totalComments }}
                    </p>
                </vRow>
                <vRow>
                    <p class="title">
                        <span class="grey--text lighten-1">zizis totaux:</span> {{ count.multiple }}
                    </p>
                </vRow>
                <vRow>
                    <p class="title">
                        <span class="grey--text lighten-1">zizis(max 1 par commentaire):</span>  {{ count.single }}
                    </p>
                </vRow>
                <vRow>
                    <p class="title">
                        <span class="grey--text lighten-1">Mis à jour:</span> {{ updated }}
                    </p>
                </vRow>
                <vRow>
                    <Comments />
                </vRow>
                <vSpacer />
            </vContainer>
        </v-content>
    </v-app>
</template>

<script>
import service from '@/assets/js/service';
import utils from '@/assets/js/utils';

import Comments from '@/components/Comments';

export default {
    name: 'App',

    components: {
        Comments,
    },

    data: () => ({
        count: {},
        updated: '',
    }),

    async created() {
        const count = await service.getCount();
        count.single = utils.formatNumber(count.single);
        count.multiple = utils.formatNumber(count.multiple);
        count.totalComments = utils.formatNumber(count.comments + count.replies);
        this.count = count;
        this.updated = utils.getTime(count.timestamp);
    },

};
</script>
