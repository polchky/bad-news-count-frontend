<template>
    <vCard>
        <vList>
            <MasterComment
                v-if="master !== undefined"
                :comment="master"
            />
            <Comment
                v-for="(comment, i) in comments"
                :key="i"
                :comment="comment"
            />
        </vList>
        <vBtn
            class="blue--text text-capitalize ma-5"
            :disabled="loadNextCommentsButtonDisabled"
            :loading="loadNextCommentsButtonDisabled"
            @click="loadNextComments"
        >
            <vIcon>
                mdi-arrow-down
            </vIcon>
            Afficher les commentaires suivants
        </vBtn>
    </vCard>
</template>

<script>
import service from '@/assets/js/service';
import utils from '@/assets/js/utils';

import Comment from '@/components/Comment';
import MasterComment from '@/components/MasterComment';

export default {

    components: {
        Comment,
        MasterComment,
    },

    data: () => ({
        comments: [],
        offset: 0,
        count: undefined,
        loadNextCommentsButtonDisabled: false,
        master: undefined,
    }),

    async created() {
        this.count = await service.getCount();
        const master = await service.getMaster();
        const masterRepliesCount = await service.getMasterRepliesCount();
        master.repliesCount = masterRepliesCount.replies;
        master.expanded = false;
        master.text = utils.searchZizis(master.text);
        this.master = master;
        await this.loadNextComments();
    },

    methods: {
        async loadNextComments() {
            const limit = 20;
            this.loadNextCommentsButtonDisabled = true;
            let comments = await service.getComments(limit, this.offset);
            comments = comments.map((c) => {
                c.expanded = false;
                c.text = utils.searchZizis(c.text);
                c.replies = c.replies.map((r) => {
                    r.text = utils.searchZizis(r.text);
                    return r;
                });
                return c;
            });
            this.offset += limit;
            this.comments.push(...comments);
            this.loadNextCommentsButtonDisabled = false;
        },

    },
};
</script>
