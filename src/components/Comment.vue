<template>
    <vListItem
        three-line
    >
        <vListItemAvatar>
            <vImg :src="comment.imageUrl" />
        </vListItemAvatar>
        <vListItemContent>
            <vListItemSubtitle class="mb-2">
                <strong class=".font-weight-bold white--text">
                    {{ comment.author }}
                </strong>
                , il y a {{ utils.getTimeDiff(new Date(comment.published)) }}
            </vListItemSubtitle>
            <vListItemTitle>
                <p class="text-wrap">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span v-html="comment.text" />
                </p>
            </vListItemTitle>
            <template v-if="comment.replies.length > 0">
                <vListItemSubtitle @click="comment.expanded = !comment.expanded">
                    <vBtn
                        text
                        class="blue--text text-capitalize"
                    >
                        <vIcon>
                            {{ comment.expanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                        </vIcon>
                        {{ comment.expanded ? 'cacher' : 'afficher' }} {{ comment.replies.length > 1 ? `les ${comment.replies.length} réponses` : 'la réponse' }}
                    </vBtn>
                </vListItemSubtitle>
                <Replies
                    v-show="comment.expanded"
                    :replies="comment.replies"
                />
            </template>
        </vListItemContent>
    </vListItem>
</template>

<script>
import utils from '@/assets/js/utils';

import Replies from '@/components/Replies';

export default {

    components: {
        Replies,
    },

    props: {
        comment: { type: Object, default: () => {} },
    },

    data: () => ({
        utils,
    }),

};
</script>
