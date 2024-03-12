from django import forms
from django.contrib.auth.models import User
from .models import Team
from users.models import NewUser
from django.core.exceptions import ValidationError
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from django.core.exceptions import NON_FIELD_ERRORS

class TeamForm(forms.ModelForm):
    members = forms.ModelMultipleChoiceField(queryset=NewUser.objects.all(), widget=forms.CheckboxSelectMultiple)

    class Meta:
        model = Team
        fields = '__all__'
        # error_messages = {
        #     NON_FIELD_ERRORS: {
        #         'unique_together': "%(model_name)s's %(field_labels)s are not unique.",
        #     }
        # }
    def clean(self):
        print("in clean")
        members = self.cleaned_data.get('members')
        sport = self.cleaned_data.get('sport')
        team_size = self.cleaned_data.get('team_size')
        genders = []

        if len(members) != team_size:
            retst = "Given team size and members count don't match"
            raise ValidationError(retst)

        print(members)
        for member in members:
            genders.append(member.gender)

            userr = NewUser.objects.get(id=member.id)
            tteams = userr.teams.all()

            MajorCat = set()
            MinorCat = set()
            inSportsNames = []

            for tt in tteams:
                if tt.sport.category != "NonMajor":
                    MajorCat.add(tt.sport.category)
                else:
                    MinorCat.add(tt.sport.name)
                inSportsNames.append(tt.sport.name)
            print("hii")

            for tt in tteams:
                inSportsNames.append(tt.sport.name)
            print("HIIII")

            if sport.category != "NonMajor" and sport.category not in MajorCat and len(MajorCat) >= 4:
                retst = "Given team member:" + str(member.user_name) + " is already in 4 teams "
                print(retst)
                raise forms.ValidationError(retst)

            print(sport.name, inSportsNames)

            if sport.category == "NonMajor":
                # Adjust NonMajor sports count based on 'Fifa-S' and 'Fifa-D'
                if ('Fifa-S' in MinorCat and sport.name == 'Fifa-D') or ('Fifa-D' in MinorCat and sport.name == 'Fifa-S'):
                    max_non_major = 6  # Maximum 5 sports including 'Fifa-S' or 'Fifa-D'
                else:
                    max_non_major = 5  # Maximum 6 sports if both 'Fifa-S' and 'Fifa-D' are present

                if len(MinorCat) >= max_non_major:
                    retst = f"Given team member: {member.user_name} is already in {max_non_major} non-major sports"
                    print(retst)
                    raise forms.ValidationError(retst)

            print(sport.name, inSportsNames)
            print(MinorCat)

            if sport.name in inSportsNames:
                retst = "Given team member:" + str(member.user_name) + " is already registered for this sport "
                print(retst)
                raise forms.ValidationError(retst)

        count_m = 0
        print("skip1")
        for g in genders:
            if g == 'm':
                count_m += 1


            # if count_m < sport.min_males or (team_size - count_m)<sport.min_females:
            #     retst = "Given team needs to have min males:"+ str(sport.min_males)+", min females:"+str(sport.min_males)
            #     raise ValidationError(retst)
            return self.cleaned_data

        # except ValidationError as e:
        #     e = str(e)
        #     return Response(data={'message': "Validation error occured with {e}"},status=status.HTTP_400_BAD_REQUEST)

        #     # handle the validation error here

        # except Exception as e:
        #     return Response(data={'message': "An error occurred while cleaning: {e}"},status=status.HTTP_400_BAD_REQUEST)
        #     # handle the exception here

# def save(self, commit=True):
#     print("IN save")

#     try:
#         my_instance = super(TeamForm, self).save(commit=commit)
#         members = self.cleaned_data.get('members')
#         sport = self.cleaned_data.get('sport')

#         for member in members:
#             try:
#                 team = SportsMapping.objects.get(player = member.id)

#                 if sport.category!="NonMajor" and sport.category not in team.registeredTeams["MajorSports"]:
#                     team.registeredTeams["MajorSports"].append(sport.category)

#                 team.registeredTeams["SportsName"].append(sport.name)
#                 team.registeredTeams["Teams"].append({"sport_name":sport.name, "team_id":my_instance.id})
#                 team.save()

#             except SportsMapping.DoesNotExist as e:
#                 print(f"No team found for player {member.id}: {e}")
#                 # handle the exception here

#     except Exception as e:
#         print(f"An error occurred while saving: {e}")
#         # handle the exception here

#     return my_instance
