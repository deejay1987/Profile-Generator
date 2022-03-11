$(document).ready(function() {

    $("body")
        .on("click", "#generate_profile_btn", function(){

            /* This will allow selected options value to be generated */
            let max_generated_profile = $("#number_generate_profile").val();

            for(let index = 0;  index < max_generated_profile; index++){
                let profile_id = Math.floor((Math.random() * 100) + 1);
                
                $.ajax({
                    url: 'https://randomuser.me/api/',
                    dataType: 'json',
                    success: function(data) {
                        /* this will generate random profile */
                        let profile_details = data.results[0];
                        let address = profile_details.location;
                        let clone_profile = $(".profile_clone").clone();
                        /* Process profile clone */
                        clone_profile.removeClass("hidden profile_clone")
                                    .attr("data-profile-id", + profile_id)
                                                
                        clone_profile.find(".profile_img").attr("src", profile_details.picture.large );
                        clone_profile.find(".full_name").text(profile_details.name.first + " " + profile_details.name.last);
                        clone_profile.find(".email_address_text").text(profile_details.email);
                        clone_profile.find(".address_text").text(address.state + " " + address.country);
                        /* Append the profile clone */
                        $("#generated_profile").append(clone_profile);
                    }
                });
            };
        }) 
        /* This will delete the specific profile */
        .on("click", ".remove_profile_btn", function() {
            
            $(this).closest("li").remove();
            // $("#generated_profile li[data-profile-id="+ $(this).closest(".profile").data("profile-id") +"]").remove();
        })
        /* Reload page */
        .on("click", "#reset_btn", function(){
            window.location.reload();
        });
});